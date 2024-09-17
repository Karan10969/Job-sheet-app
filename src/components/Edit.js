import { useParams } from "react-router-dom"
import { useGetAllJobsQuery } from "./JobsApiSlice"
import EditForm from "./EditForm"

export default function Edit() {
  const {id} = useParams()

  const {
    data: jobs,
    isSuccess: isJobsSuccess,
    isLoading: isLoading
  } = useGetAllJobsQuery()


  let job = null
  let content = null
  if(isLoading){
    content = <p>Loading...</p>
  }
  
  if(isJobsSuccess){
    job = jobs.filter(job => job.id === id)

    content = job ? <EditForm job={job} /> : null
  }

  return(
    <>
      {content}
    </>
  )
}