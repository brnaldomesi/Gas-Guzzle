import React, { useState } from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const compile = async () => {
    const req = await fetch('/api/internal/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
    const result = await req.json()
    setOutput(JSON.stringify(result, null, '  '))
  }
  const execute = async () => {
    const req = await fetch('/api/internal/vm-execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
    const result = await req.json()
    setOutput(JSON.stringify(result, null, '  '))
  }

  return (
    <div>
      <Title>My page</Title>
      <textarea value={code} onChange={(e: any) => setCode(e.target.value)} />
      <button onClick={compile}>Compile</button>
      <button onClick={execute}>Execute</button>
      <pre>{output}</pre>
    </div>
  );
}
