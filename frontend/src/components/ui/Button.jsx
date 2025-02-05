const Button = ({ variant, size, onClick, children }) => {
    const sizeClasses = {
      sm: "py-2 px-4 text-sm",
      md: "py-3 px-6 text-base",
      lg: "py-4 px-8 text-lg",
    }
  
    const variantClasses = {
      outline: "border-2 border-gray-500 text-gray-500",
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
      destructive: "bg-red-500 text-white",
    }
  
    const sizeClass = sizeClasses[size] || sizeClasses.md
    const variantClass = variantClasses[variant] || variantClasses.primary
  
    return (
      <button
        className={`rounded-md ${sizeClass} ${variantClass} hover:bg-opacity-80 focus:outline-none`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
  
  export default Button
  