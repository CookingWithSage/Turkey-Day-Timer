// Button component - Reusable button with variants
// TODO: Implement in Phase 3

function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
