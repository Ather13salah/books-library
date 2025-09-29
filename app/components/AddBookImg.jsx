
function AddBookImg({handleChange,label,style}) {
  return (
    <div className="w-full flex justify-center ">
         <input
            type="file"
            onChange={(e) => handleChange(e)}
            className="hidden"
            id="book"
          />
          <label
            className={style}
            htmlFor="book"
          >
            {label}
          </label>
    </div>
  )
}

export default AddBookImg
