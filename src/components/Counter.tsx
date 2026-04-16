import { useCounter } from '../hooks/useCounter'
import '../styles/App.css'

export function Counter() {
  const { count, increment } = useCounter(0)

  return (
    <button className="counter" onClick={increment}>
      Count is {count}
    </button>
  )
}
