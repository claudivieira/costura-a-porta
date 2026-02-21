'use client'
import React from 'react'
import { sendGTMEvent } from '@next/third-parties/google'

type onlineShopBtnProps = {
  extraStyles: string,
  placement?: string
}


const OnlineShopBtn = ({ extraStyles, placement }: onlineShopBtnProps) => {
  return (
    <a 
        className={`border rounded-lg px-6 h-10 uppercase inline-flex items-center justify-center ${extraStyles}`}
        href="https://store.costuraaporta.pt"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir para a loja online"
        onClick={() => sendGTMEvent({
          event: "online_shop_button_click",
          placement: `${placement}`
        })}
    >
        Ver a loja online
    </a>
  )
}

export default OnlineShopBtn
