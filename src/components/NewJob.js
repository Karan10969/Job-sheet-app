import { useState, useEffect } from "react"
import { useCreateJobMutation } from "./JobsApiSlice"
import { useNavigate } from 'react-router-dom'


export default function NewJob() {
    const navigate = useNavigate()

    const [createJob, {
        isSuccess
    }] = useCreateJobMutation()




    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess])


    const [clientName, setClientName] = useState("")
    const [contact, setContact] = useState("")
    const [recieveDate, setRecieveDate] = useState("")
    const [inventory, setInventory] = useState("")
    const [issue, setIssue] = useState("")
    const [note, setNote] = useState("")
    const [technician, setTechnician] = useState("")
    const [deadline, setDeadline] = useState("")
    const [estimate, setEstimate] = useState("")
    const [status, setStatus] = useState("")


    const onSubmitClicked = async (e) => {
        e.preventDefault()
        console.log(clientName)
        console.log(contact)
        console.log(recieveDate)
        console.log(inventory)
        console.log(issue)
        console.log(note)
        console.log(technician)
        console.log(deadline)
        console.log(estimate)
        console.log(status)

        if(!clientName || !contact || !recieveDate || !inventory || !issue || !note || !technician || !deadline || !estimate || !status) {
            return alert ("please fill all the fields")
        }

        await createJob( {client_name: clientName, contact_info:contact, recieved_date:recieveDate, inventory_recieved:inventory, reported_issues:issue, client_notes:note, assigned_technician:technician, deadline:deadline, esitmated_amount:estimate,status:status} )

    }

    const onClientChange = (e) => setClientName(e.target.value)
    const onContactChange = (e) => setContact(e.target.value)
    const onRecieveDateChange = (e) => setRecieveDate(e.target.value)
    const onInventoryChange = (e) => setInventory(e.target.value)
    const onIssueChange = (e) => setIssue(e.target.value)
    const onNoteChange = (e) => setNote(e.target.value)
    const onTechnicianChange = (e) => setTechnician(e.target.value)
    const onDeadlineChange = (e) => setDeadline(e.target.value)
    const onEstimateChange = (e) => setEstimate(e.target.value)
    const onStatusChange = (e) => setStatus(e.target.value)


    return (
        <>
            <header className="new-job-header">CREATE NEW JOB SHEET</header>

            <form className="new-job-form" onSubmit={onSubmitClicked}>

                <label className="form-label" htmlFor="new-name">Client Name</label>
                <input
                    id="new-name"
                    type="text"
                    className="form-input"
                    value={clientName}
                    onChange={onClientChange}
                >
                </input>

                <label className="form-label" htmlFor="new-contact">Contact No. (10 Digits)</label>
                <input
                    id="new-contact"
                    type="text"
                    className="form-input"
                    value={contact}
                    onChange={onContactChange}
                >
                </input>

                <label className="form-label" htmlFor="new-date">Recieved Date</label>
                <input
                    id="new-date"
                    type="date"
                    className="form-input"
                    value={recieveDate}
                    onChange={onRecieveDateChange}
                >
                </input>

                <label className="form-label" htmlFor="new-inventory">Inventory Recieved</label>
                <input
                    id="new-inventory"
                    type="text"
                    className="form-input"
                    value={inventory}
                    onChange={onInventoryChange}
                >
                </input>


                <label className="form-label" htmlFor="new-issues">Reported Issues</label>
                <textarea
                    id="new-issues"
                    type="text"
                    className="form-input"
                    value={issue}
                    onChange={onIssueChange}
                >
                </textarea>

                <label className="form-label" htmlFor="new-notes">Client Notes</label>
                <textarea
                    id="new-notes"
                    type="text"
                    className="form-input"
                    value={note}
                    onChange={onNoteChange}
                >
                </textarea>

                <label className="form-label" htmlFor="new-technician">Assigned Technician</label>
                <input
                    id="new-technician"
                    type="text"
                    className="form-input"
                    value={technician}
                    onChange={onTechnicianChange}
                >
                </input>

                <label className="form-label" htmlFor="new-deadline">Deadline</label>
                <input
                    id="new-deadline"
                    type="date"
                    className="form-input"
                    value={deadline}
                    onChange={onDeadlineChange}
                >
                </input>

                <label className="form-label" htmlFor="new-amount">Estimated Amount</label>
                <input
                    id="new-amount"
                    type="text"
                    className="form-input"
                    value={estimate}
                    onChange={onEstimateChange}
                >
                </input>

                <label className="form-label" htmlFor="new-status">Status</label>
                <select
                    id="new-status"
                    className="form-input"
                    onChange={onStatusChange}
                    value={status}
                >
                    <option value="Pending">Pending</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <button className="update-note-button" type="submit">Save New Job</button>
            </form>

        </>
    )
}