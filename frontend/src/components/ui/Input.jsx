function Input({ type = 'text', placeholder, value, onChange, disabled = false, className = '', ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 ${className}`}
      {...props}
    />
  )
}

export default Input
