import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Editor from './components/Editor'
import { defaultData } from './data/defaults'

function App() {
  const [data, setData] = useState(defaultData)
  const [showEditor, setShowEditor] = useState(true)

  const updateData = (path, value) => {
    setData(prev => {
      const next = { ...prev }
      const keys = path.split('.')
      let cur = next
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i]
        cur[k] = { ...cur[k] }
        cur = cur[k]
      }
      cur[keys[keys.length - 1]] = value
      return next
    })
  }

  return (
    <div className="flex min-h-screen bg-inflow-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          dateRange={`${data.period.start} — ${data.period.end}`}
          onToggleEditor={() => setShowEditor(e => !e)}
          showEditor={showEditor}
        />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            <Dashboard data={data} />
          </main>
          {showEditor && (
            <aside className="w-80 shrink-0 border-l border-inflow-border overflow-auto bg-inflow-sidebar/50">
              <Editor data={data} onUpdate={updateData} />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
