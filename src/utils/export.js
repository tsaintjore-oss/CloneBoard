export async function exportToPng(element, filename = 'inflow-dashboard') {
  if (!element) return
  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(element, {
      backgroundColor: '#0f1117',
      scale: 2,
      useCORS: true,
      logging: false,
    })
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    console.error('Export failed:', e)
    alert('Export échoué. Vérifiez la console.')
  }
}
