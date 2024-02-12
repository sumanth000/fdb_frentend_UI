import styles from './css_folder/employeePage.module.css'
export default function EmployeePage(){
    return(
        <div className={styles.body}>
            <div className={styles.container}>

                <table>
                    <thead>
                        <tr>
                            <td>employee_id</td>
                            <td>employee_name</td>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                          <td>2341234</td>
                          <td>sumanth</td>
                    </tr>

                    <tr>
                          <td>2341234</td>
                          <td>sumanth</td>
                    </tr>

                    <tr>
                          <td>2341234</td>
                          <td>sumanth</td>
                    </tr>
                    
                    </tbody>
                    
                    
                </table>

            </div>
            
        </div>
    )
}