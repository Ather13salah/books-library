
import AddBookImg from './AddBookImg';
function AddChoices({handleChange,setOpen}) {
  return (
    <div>
       <details className=" fixed top-2 right-2 p-4 shadow-md ">
            <summary className="cursor-pointer text-purple-600 text-center mt-3.5 w-36  rounded-lg ">
              Add New
            </summary>
            <button
              className="cursor-pointer bg-purple-600 text-center mt-3.5 text-amber-50 w-full rounded-md "
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Manual

            </button>
            <AddBookImg
              label={"Add Image"}
              style={
                "cursor-pointer bg-purple-600 text-center mt-3.5 text-amber-50 w-full rounded-md "
              }
              handleChange={handleChange}
            />
            
          </details>
    </div>
  )
}

export default AddChoices
