
"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

export default function MainLayout({children}) {
  return (
    <Provider store={store}> // store to give provider

        {children}
    </Provider>
  )
}
