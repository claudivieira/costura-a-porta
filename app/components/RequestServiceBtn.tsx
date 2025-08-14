import React from 'react'
import { sendGTMEvent } from '@next/third-parties/google'


type requestServiceBtnProps = {
  extraStyles: string,
  placement?: string
}


const RequestServiceBtn = ({ extraStyles, placement }: requestServiceBtnProps) => {
  return (
    <a 
            className={`border rounded-lg px-6 h-10 uppercase inline-flex items-center justify-center ${extraStyles}`}
            href="https://wa.link/1v15kn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendGTMEvent({ event: 'buttonClicked', value: `Request Service ${placement}` })}
        >
            Pedir Arranjo
        </a>
  )
}

export default RequestServiceBtn
