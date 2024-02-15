import React , { Fragment ,useState,useEffect } from 'react';
import {Button , Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link,useNavigate} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

function Home(){

    let Navigation = useNavigate();

    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const response = await fetch('https://my-app-db-33c96-default-rtdb.firebaseio.com/my_app.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const fetchedData = await response.json();
            setData(fetchedData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        fetchData();
    }, []);
    
    const deleteData = async (key) => {
        try {
            setLoading(true);
            const response = await fetch(`https://my-app-db-33c96-default-rtdb.firebaseio.com/my_app/${key}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.ok) {
                console.log(`Data with key ${key} deleted successfully.`);
                
                // Refetch data after successful deletion
                fetchData();
            } else {
                throw new Error('Failed to delete data.');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
        Navigation('/');
    };
    
    

    if (loading) {
        return (
            <Spinner animation="border" role="status" style={{margin:'10rem'}}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    

    // const HandleDelete = (id) => {


       
    //     let index = Object.keys(data).findIndex((e) => e.id === id);
       
    //     Object.keys(data).splice(index ,1);
    //     console.log(ls);
    //      Navigation('/');
    // }

   
    
   
   
    
   

    return(
        <Fragment>

           
        
            <div className="container" style={{marginTop:"10rem"}}>
            <h1>User List</h1>

                <Table striped bordered hover size="sm" >
                    <thead>
                       <tr>
                       <th>Sr. No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        
                        <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                    {
                        data && Object.keys(data).length >0 ? Object.keys(data).map((key,index) => {
                            const item = data[key];
                           
                            return(
                                <tr key={item.id}>
                                    <td>{index+1}.</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.email}</td>
                                   
                                    <td> <Link to={'/edit'} state={{ data: {datakey:key,name:item.name,age:item.age,id:item.id,email:item.email}}}><Button className="btn-success">Edit</Button></Link> &nbsp;
                                    <Button className="btn-danger" onClick={()=>deleteData(key)}>Delete</Button></td>
                                </tr>
                                
                            )

                        }) : <tr><td colSpan={5} style={{color:'red'}}>No data Available... </td></tr>
                    }
                   
                   </tbody>


                </Table>
                <br></br>
                <br></br>
                <Link  to={'/add'}><Button size='lg'>Create</Button></Link>



            </div>
            </Fragment>
       

    )



}

export default Home;