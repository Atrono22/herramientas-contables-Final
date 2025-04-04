"use client"

import { useState } from 'react'
import * as ExcelJS from 'exceljs'
import { Upload, FileSpreadsheet, CheckCircle } from 'lucide-react'
import type { Fill, FillPattern } from 'exceljs'

export default function IntegracionPage() {
    const [file, setFile] = useState<File | null>(null)
    const [processing, setProcessing] = useState(false)

    // Función para normalizar referencias
    const normalizarReferencia = (ref: string): string => {
        if (!ref) return ''
        
        // Convertir a mayúsculas y eliminar espacios
        let normalizada = ref.toUpperCase().trim()
        
        // Eliminar prefijos comunes
        const prefijos = ['F-', 'FAC-', 'FACTURA-', 'FRA-', 'FC-', 'F/', 'FAC/', 'FNAA']
        prefijos.forEach(prefijo => {
            if (normalizada.startsWith(prefijo)) {
                normalizada = normalizada.substring(prefijo.length)
            }
        })
        
        // Eliminar caracteres especiales y espacios
        normalizada = normalizada.replace(/[^A-Z0-9]/g, '')
        
        return normalizada
    }

    const processExcel = async () => {
        if (!file) {
            alert('Por favor selecciona un archivo Excel')
            return
        }

        setProcessing(true)
        try {
            // Leer el archivo de una manera más segura
            const reader = new FileReader()
            
            const processFileContent = async (arrayBuffer: ArrayBuffer) => {
                const workbook = new ExcelJS.Workbook()
                await workbook.xlsx.load(arrayBuffer)

                const worksheet = workbook.getWorksheet(1)
                if (!worksheet) {
                    throw new Error('No se pudo encontrar la hoja de cálculo')
                }

                let coincidencias = 0
                let coincidenciasAmarillas = 0

                // Crear una nueva hoja para el resultado
                const newWorksheet = workbook.addWorksheet('Procesado')

                // Copiar todas las filas y formatos de la hoja original
                worksheet.eachRow((row, rowNumber) => {
                    const newRow = newWorksheet.getRow(rowNumber)
                    row.eachCell((cell, colNumber) => {
                        const newCell = newRow.getCell(colNumber)
                        newCell.value = cell.value
                        newCell.style = { ...cell.style }
                    })
                    newRow.commit()
                })

                // Procesar por secciones (cuentas)
                let inicioSeccion = 6 // Primera fila después de encabezados
                let finSeccion: number

                while (inicioSeccion < worksheet.rowCount) {
                    // Buscar el siguiente "Total"
                    finSeccion = inicioSeccion
                    while (finSeccion <= worksheet.rowCount) {
                        const cell = newWorksheet.getRow(finSeccion).getCell(5)
                        const valor = cell.text.trim().toUpperCase()
                        if (valor.includes('TOTAL')) {
                            break
                        }
                        finSeccion++
                    }

                    // Procesar esta sección
                    const cargos = new Map<string, {
                        rowNumber: number;
                        monto: number;
                        referenciaOriginal: string;
                    }[]>()

                    // Recolectar cargos de esta sección
                    for (let i = inicioSeccion; i < finSeccion; i++) {
                        const row = newWorksheet.getRow(i)
                        const referencia = row.getCell(5).text.trim()
                        const cargoStr = row.getCell(6).text.trim()
                        const cargo = cargoStr ? parseFloat(cargoStr.replace(/,/g, '')) : 0

                        if (referencia && !isNaN(cargo) && cargo > 0) {
                            const refNormalizada = normalizarReferencia(referencia)
                            if (!cargos.has(refNormalizada)) {
                                cargos.set(refNormalizada, [])
                            }
                            cargos.get(refNormalizada)!.push({
                                rowNumber: i,
                                monto: cargo,
                                referenciaOriginal: referencia
                            })
                        }
                    }

                    // Buscar abonos y marcar coincidencias
                    const filasUsadas = new Set<number>()

                    for (let i = inicioSeccion; i < finSeccion; i++) {
                        if (filasUsadas.has(i)) continue

                        const row = newWorksheet.getRow(i)
                        const referencia = row.getCell(5).text.trim()
                        const abonoStr = row.getCell(7).text.trim()
                        const abono = abonoStr ? parseFloat(abonoStr.replace(/,/g, '')) : 0

                        if (referencia && !isNaN(abono) && abono > 0) {
                            const refNormalizada = normalizarReferencia(referencia)
                            const cargosDisponibles = cargos.get(refNormalizada) || []

                            // Buscar coincidencia exacta
                            const cargoCoincidente = cargosDisponibles.find(c => 
                                !filasUsadas.has(c.rowNumber) && 
                                Math.abs(c.monto - abono) < 0.01
                            )

                            if (cargoCoincidente) {
                                // Coincidencia exacta - Verde
                                const fillGreen: ExcelJS.Fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'FF90EE90' }
                                } as ExcelJS.FillPattern

                                // Marcar cargo
                                const filaCargo = newWorksheet.getRow(cargoCoincidente.rowNumber)
                                filaCargo.getCell(5).fill = fillGreen
                                filaCargo.getCell(6).fill = fillGreen
                                filaCargo.commit()

                                // Marcar abono
                                row.getCell(5).fill = fillGreen
                                row.getCell(7).fill = fillGreen
                                row.commit()

                                filasUsadas.add(cargoCoincidente.rowNumber)
                                filasUsadas.add(i)
                                coincidencias++
                            } else if (cargosDisponibles.length > 0) {
                                // Referencia coincide pero monto no - Amarillo
                                const fillYellow: ExcelJS.Fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'FFFFFF00' }
                                } as ExcelJS.FillPattern

                                // Marcar todos los cargos relacionados
                                cargosDisponibles.forEach(cargo => {
                                    if (!filasUsadas.has(cargo.rowNumber)) {
                                        const filaCargo = newWorksheet.getRow(cargo.rowNumber)
                                        filaCargo.getCell(5).fill = fillYellow
                                        filaCargo.getCell(6).fill = fillYellow
                                        filaCargo.commit()
                                    }
                                })

                                // Marcar abono
                                row.getCell(5).fill = fillYellow
                                row.getCell(7).fill = fillYellow
                                row.commit()

                                coincidenciasAmarillas++
                            }
                        }
                    }

                    // Preparar para la siguiente sección
                    inicioSeccion = finSeccion + 1
                }

                // Eliminar la hoja original y renombrar la nueva
                workbook.removeWorksheet(worksheet.id)
                newWorksheet.name = 'Cuenta Integrada'

                // Guardar el archivo
                const buffer2 = await workbook.xlsx.writeBuffer()
                const blob = new Blob([buffer2], { 
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
                })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'cuenta_integrada.xlsx'
                a.click()
                window.URL.revokeObjectURL(url)

                alert(`Proceso completado.\nCoincidencias exactas: ${coincidencias}\nCoincidencias parciales: ${coincidenciasAmarillas}`)
            }

            // Usar Promise para manejar la lectura del archivo
            await new Promise((resolve, reject) => {
                reader.onload = async (e) => {
                    try {
                        if (e.target?.result) {
                            await processFileContent(e.target.result as ArrayBuffer)
                            resolve(null)
                        }
                    } catch (error) {
                        reject(error)
                    }
                }
                reader.onerror = () => reject(new Error('Error al leer el archivo'))
                reader.readAsArrayBuffer(file)
            })

        } catch (error) {
            console.error('Error:', error)
            alert('Error al procesar el archivo: ' + (error as Error).message)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className="app-container">
            <h1 className="title">
                Integración de Cuentas
            </h1>
            <p className="subtitle">
                Procesa y analiza tus archivos Excel de manera eficiente y profesional.
            </p>

            <div className="glass-card">
                <div className="form-container">
                    <div 
                        className="upload-zone"
                        onClick={() => document.getElementById('file-input')?.click()}
                    >
                        {!file ? (
                            <>
                                <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                                <p className="text-lg font-medium mb-2">
                                    Arrastra tu archivo Excel aquí
                                </p>
                                <p className="text-sm text-gray-400">
                                    o haz clic para seleccionar
                                </p>
                            </>
                        ) : (
                            <>
                                <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-green-500" />
                                <p className="text-lg font-medium mb-2">
                                    {file.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Haz clic para cambiar el archivo
                                </p>
                            </>
                        )}
                    </div>

                    <input
                        id="file-input"
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                    />

                    <button 
                        onClick={processExcel}
                        disabled={processing || !file}
                        className="button w-full flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Procesando...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Procesar archivo
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}