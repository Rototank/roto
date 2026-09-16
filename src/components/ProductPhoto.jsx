export default function ProductPhoto({ product, className = '', alt }) {
  return (
    <img
      src={product.image}
      alt={alt || product.name}
      className={className}
    />
  )
}
