import { useParams } from "react-router-dom"
import { useGetAllJobsQuery, useUpdateJobMutation, useDeleteJobMutation } from "./JobsApiSlice"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {usePDF} from 'react-to-pdf'

export default function View() {
    
    const {toPDF, targetRef} = usePDF({filename: "job_sheet.pdf"})
    
    const navigate = useNavigate()
    const { id } = useParams()

    const [note, setNote] = useState()

    const {
        data: jobs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllJobsQuery()

    const [updateJob, {
        isSuccess: isUpdateSuccess,
    }] = useUpdateJobMutation()

    let content = null

    if (isLoading) {
        content = <p>Loading...</p>
    }
    if (isError) {
        <p>Error: {error.message}</p>
    }

    let job = null

    const onClientNoteChange = (e) => setNote(e.target.value)

    const onUpdateNoteClicked = async () => {
        if (note === job.client_notes) {
            return alert("Please Update Note")
        }

        if (job) {
            await updateJob({ jobId: id, client_notes: note })
        }
    }


    const [deleteJob,
        { isSuccess:isDeleteSucces, isLoading: isDeleteLoading }
    ] = useDeleteJobMutation()


    const onDeleteClick = async (id) => {
        if (isDeleteLoading) {
            document.querySelector('#job-delete-button').style.display = "none"
        }

        await deleteJob({ id })

    }

    useEffect(() => {
        if (isDeleteSucces) {
            alert("Job Deleted")
        }
    }, [isDeleteSucces])


    useEffect(() => {
        if (isUpdateSuccess)
            navigate('/')
    }, [isUpdateSuccess])

    if (isSuccess) {
        job = jobs.filter(job => job.id === id)

        content = job.map(jobInfo => {
            return (
                <div key={jobInfo.id} className="view-job-sheet-container" >
                    <div className="job-info-section">
                        <section className="info-type">
                            Client Name:
                        </section>
                        <section className="info">
                            {jobInfo.client_name}
                        </section>

                        <section className="info-type">
                            Contact info:
                        </section>
                        <section className="info">
                            {jobInfo.contact_info}
                        </section>

                        <section className="info-type">
                            Recieved Date:
                        </section>
                        <section className="info">
                            {jobInfo.recieved_date}
                        </section>

                        <section className="info-type">
                            Inventory Recieved:
                        </section>
                        <section className="info">
                            {jobInfo.inventory_recieved}
                        </section>

                        <section className="info-type">
                            Document Recieved:
                        </section>
                        <section className="info">
                            {jobInfo.client_name}
                        </section>

                        <section className="info-type">
                            Reported Issue:
                        </section>
                        <section className="info">
                            {jobInfo.reported_issues}
                        </section>

                        <section className="info-type">
                            Client Notes:
                        </section>
                        <section className="info">
                            {jobInfo.client_notes}
                        </section>

                        <section className="info-type">
                            Assigned Technician:
                        </section>
                        <section className="info">
                            {jobInfo.assigned_technician}
                        </section>

                        <section className="info-type">
                            Estimated Amount:
                        </section>
                        <section className="info">
                            {jobInfo.esitmated_amount}
                        </section>

                        <section className="info-type">
                            Deadline:
                        </section>
                        <section className="info">
                            {jobInfo.deadline}
                        </section>

                        <section className="info-type">
                            Status:
                        </section>
                        <section className="info">
                            {jobInfo.status}
                        </section>

                    </div>

                    <span>Add/Update Note</span><br />
                    <textarea
                        className="form-input"
                        defaultValue={jobInfo.client_notes}
                        onChange={onClientNoteChange}>
                    </textarea>
                    <button
                        className="update-note-button"
                        onClick={onUpdateNoteClicked}
                        disabled={isLoading}
                    >Save Note</button><br></br>


                    <Link to={`/edit/${jobInfo.id}`}>
                        <button className="job-button" id="job-edit-button">Edit</button>
                    </Link>

                    <button className="job-button" id="job-delete-button"
                        onClick={() => onDeleteClick(jobInfo.id)}>Delete</button>

                </div>
            )
        })
    }


    const onBackClicked = () => {
        navigate('/')
    }


    return (
        <div ref={targetRef}>
            <header className="view-header">VIEW JOB SHEET</header>
            {content}
            <button onClick={onBackClicked}>Back</button>
            <button onClick={() => toPDF()}>Download PDF</button>
        </div>
    )
}