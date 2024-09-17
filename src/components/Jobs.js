import { Link } from 'react-router-dom'
import { useDeleteJobMutation } from './JobsApiSlice'
import { useEffect } from 'react'


export default function Jobs({ jobs }) {

    const [deleteJob,
        { isSuccess, isLoading }
    ] = useDeleteJobMutation()


    const onDeleteClick = async (id) => {
        if (isLoading) {
            document.querySelector('#job-delete-button').style.display = "none"
        }

        await deleteJob({ id })

    }

    useEffect(() => {
        if (isSuccess) {
            alert("Job Deleted")
        }
    }, [isSuccess])


    const jobSection = jobs.map(job => {

        return (
            <div className="job" key={job.id}>
                <section>
                    {jobs.indexOf(job) + 1}
                </section>
                <section>
                    {job.id}
                </section>
                <section>
                    {job.client_name}
                </section>
                <section>
                    {job.contact_info}
                </section>
                <section>
                    {job.recieved_date}
                </section>
                <section>
                    {job.inventory_recieved}
                </section>
                <section>
                    {job.reported_issues}
                </section>
                <section>
                    {job.client_notes}
                </section>
                <section>
                    {job.assigned_technician}
                </section>
                <section>
                    {job.esitmated_amount}
                </section>
                <section>
                    {job.deadline}
                </section>
                <section>
                    {job.status}
                </section>


                <article>
                    <Link to={`/${job.id}`}>
                        <button className="job-button" id="job-view-button">
                            View
                        </button>
                    </Link>

                    <Link to={`/edit/${job.id}`}>
                        <button className="job-button" id="job-edit-button">Edit</button>
                    </Link>
                    <button className="job-button" id="job-delete-button"
                        onClick={() => onDeleteClick(job.id)}>Delete</button>
                </article>

            </div>
        )
    })

    return (
        <>
            {jobSection}
        </>
    )
}