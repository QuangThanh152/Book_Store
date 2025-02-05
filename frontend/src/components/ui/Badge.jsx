const Badge = ({ variant, children }) => {
    const variants = {
      secondary: "bg-gray-300 text-gray-700",
      success: "bg-green-500 text-white",
      destructive: "bg-red-500 text-white",
    }
  
    const variantClass = variants[variant] || variants.secondary
  
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantClass}`}
      >
        {children}
      </span>
    )
  }
  
  export default Badge
  