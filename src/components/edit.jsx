import React, { useState ,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function Edit() {
    const location = useLocation();

   
    console.log(location.state);

    const [Datakey,setDatakey] = useState();

    const [Newdata, setNewdata] = useState({
        name:'',
        age:'',
        id:'',
        email:''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
 
    useEffect(() => {

        setNewdata({
            ...Newdata,
            name: location.state.data.name,
            age: location.state.data.age,
            id: location.state.data.id,
            email: location.state.data.email
        });
        setDatakey(location.state.data.datakey);
        
        
       
      }, [Newdata,location]);
      const updateData = async (Datakey, Newdata) => {
        try {
            setLoading(true);
            const response = await fetch(`https://my-app-db-33c96-default-rtdb.firebaseio.com/my_app/${Datakey}.json`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Newdata) 
            });
    
            if (response.ok) {
                setLoading(false);
              
                
            } else {
                throw new Error('Failed to update data.');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
        navigate('/'); 
    };
    
    if (loading) {
        return (
            <Spinner animation="border" role="status" style={{margin:'10rem'}}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
    }

    return (
        <div className="card" style={{ margin: '10rem auto', width: '300px',padding:'2rem' }}>
            <h2>Edit User</h2><br></br>
            <input type="text" placeholder="Name" value={Newdata.name} required onChange={(e) => setNewdata({ ...Newdata, name: e.target.value })} /><br></br>
            <input type="text" placeholder="Age" value={Newdata.age} required  onChange={(e) => setNewdata({...Newdata, age: e.target.value })} /><br></br>
            <input type="text" placeholder="Email." value={Newdata.email} required  onChange={(e) => setNewdata({...Newdata, email: e.target.value })} /><br></br>
            <Button onClick={() => updateData(Datakey, Newdata)}>Update</Button>
        </div>
    )
}

export default Edit;
