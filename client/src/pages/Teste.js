import React from 'react'
import { useParams } from 'react-router-dom'

export default function Teste() {
    const { id } = useParams()
    return (
        <div>
            PRODUTO {id}
        </div>
    )
}
