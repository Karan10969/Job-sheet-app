import { Link, useNavigate } from 'react-router-dom'
import { useGetAllJobsQuery } from './JobsApiSlice'

import Jobs from './Jobs'
import { useState } from 'react'

export default function Home() {
    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const {
        data: jobs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllJobsQuery()


    const onNewJobSheetClicked = () => {
        navigate('/new')
    }



    let content = null
    if (isLoading) {
        content = <p>Loading....</p>
    }
    if (isSuccess) {

        // handling search
        const onSearchChange = (e) => {
            setSearch(e.target.value)
         if (search.length === 1) {
            document.querySelector('.searched-jobs').style.display = "none"
        }
        else {
            document.querySelector('.searched-jobs').style.display = "flex"
        }
    }

    const searchedJobs = jobs.filter(job =>
        job.client_name.toLowerCase().includes(search.toLowerCase()) || job.id.toLowerCase().includes(search.toLowerCase()))
    console.log(searchedJobs)

    const searchedJobsSection = searchedJobs.map(sjob => {
        return (
            <li key={sjob.id}>
                {sjob.client_name} &nbsp;&nbsp;&nbsp;
                <Link to={`/${sjob.id}`}>Details</Link>
            </li>
        )
    })

    // search handling end

    content = (
        <div className="home-container">

            <header>
                HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD
            </header>

            <section className="search-bar">

                <input type="text"
                    className="input-text"
                    id="input-search"
                    placeholder="Search By Client Name or ID"
                    onChange={onSearchChange}
                ></input>


                <div className='searched-jobs'>
                    <ul>
                        {searchedJobsSection.length === 0 ? "No Client Found!!" : searchedJobsSection}
                    </ul>
                </div>
            </section>

            <button className="new-job-sheet-button"
                onClick={onNewJobSheetClicked}
            >
                New Job Sheet</button>

            <div className='jobs-container'>
                <div className='jobs-headings'>
                    <section>#</section>
                    <section>Client Id</section>
                    <section>Client Name</section>
                    <section>Contact Info</section>
                    <section>Recieved Date</section>
                    <section>Inventory Recieved</section>
                    <section>Reported Issues</section>
                    <section>Client Notes</section>
                    <section>Assigned Technician</section>
                    <section>Estimated Amount</section>
                    <section>Deadline</section>
                    <section>Status</section>
                    <section>Actions</section>
                </div>

                <Jobs jobs={jobs} />
            </div>


            <footer>&copy; 2024 Hardik Traders</footer>
        </div>
    )
}


return (
    <>
        {content}
    </>
)
}