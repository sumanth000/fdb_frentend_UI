import admstyles from './css-folder/AdminPage.module.css'


const OfPerson = (params) => {
    let { close } = params;;




    return (
        //return a div with pie chart from the table
        <div>




            <div className={admstyles.closeButton}>
                <button onClick={close}>Back</button>

            </div>



            <h1>Person Stats</h1>

        </div>
    )
}
export default OfPerson;