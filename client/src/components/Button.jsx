function Button({ children, color = "green", onClick, className }) {
    const baseClasses = "w-full h-10 px-2.5 mb-2.5 text-lg font-medium text-white border border-transparent rounded cursor-pointer";
    const backgroundColorClass = `bg-${color}-600`;
    const hoverBackgroundColorClass = `hover:bg-${color}-700`;
  
    // Combine all classes
    const buttonClasses = `${baseClasses} ${backgroundColorClass} ${hoverBackgroundColorClass} ${className}`;
  
    return (
      <button onClick={onClick} className={buttonClasses}>
        {children}
      </button>
    );
  }
  
  export default Button;
  