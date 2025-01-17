import React, { useEffect } from 'react'

export default function Print(props: {
  children: React.ReactNode
  Button?: React.ComponentType<{ onClick: () => void }>
  stylePrint?: string,
  isPrintImmediately?: boolean;
}) {
  const { Button, children, stylePrint, isPrintImmediately } = props
  const style = `
        @media print {

            #divcontents {
                display: block
            }
            ${stylePrint || ""}
        }
        @page {
            size: 100% 40mm;
            margin: 0;
        }
    `

  // const handlePrint = () => {
  //   const iframe = document.getElementById('printQr') as HTMLIFrameElement
  //   const element = document.getElementById('divcontents')
  //   const pri = iframe.contentWindow
  //   if (pri && element) {
  //     pri.document.open()
  //     pri.document.write('<style>' + style + '</style>')
  //     pri.document.write(element.innerHTML)
  //     pri.document.close()
  //     iframe.onload = () => {
  //       pri.focus()
  //       pri.print()
  //       iframe.onload = null
  //       // Sau khi in, xóa nội dung iframe
  //       iframe.srcdoc = ''
  //     }
  //   } else {
  //     console.error('Iframe or its contentWindow is not available.')
  //   }
  // }

  const handlePrint = () => {
    const element = document.getElementById('divcontents')
    if (element) {
      // Gắn thêm style vào nội dung HTML cần in
      const contentToPrint = `
        <html>
          <head>
            <style>${style}</style>
          </head>
          <body>${element.innerHTML}</body>
        </html>
      `
      // Gửi nội dung qua ipcRenderer tới main process
      if (window.ipcRenderer) {
        window.ipcRenderer.send('print-content', contentToPrint)
      } else {
        console.error('ipcRenderer is not available on window.')
      }
    }
  }

  useEffect(() => {
    if (isPrintImmediately) handlePrint();
  }, [])
  return (
    <>
      {Button && <Button onClick={handlePrint} />}
      <iframe
        id='printQr'
        style={{
          height: '0px',
          width: '0px',
          position: 'absolute'
        }}
      ></iframe>
      <div id='divcontents' className='hidden'>
        {children}
      </div>
    </>
  )
}
