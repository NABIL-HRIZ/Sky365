import React from 'react'
import img from '../assests/heroImage.png'
const NewSletter = () => {
  return (
   <div className="container my-5">
  <div className="row bg-white rounded-4 overflow-hidden shadow-sm mx-2 mx-md-auto" style={{maxWidth:"960px"}}>
    <div className="col-md-6 d-none d-md-block p-0">
      <img src={img}
           alt="newsletter" className="img-fluid h-100 w-100 object-fit-cover rounded-start-4" />
    </div>

    <div className="col-md-6 position-relative d-flex align-items-center justify-content-center">
      

      <div className="px-4 py-5 text-center">
        <h1 className="h3 fw-bold">Stay Inspired</h1>
        <p className="mt-3 text-muted">
          Be the first to get the latest news about trends, promotions, and much more!
        </p>

        <form className="mt-4 d-flex">
          <input type="email" className="form-control rounded-start" placeholder="Your email address" />
          <button type="submit" className="btn btn-info px-4 rounded-end">Submit </button>
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default NewSletter
