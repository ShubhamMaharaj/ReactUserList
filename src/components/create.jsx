import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import Spinner from 'react-bootstrap/Spinner';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function Create() {
    const navigate = useNavigate();
    const [User, setUser] = useState({
        name:'',
        age:'',
        email:''
    });
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); // New state for success alert

    const handleSubmit = async (e) => {
        e.preventDefault();
        let uid = uuid(); 
        let uniqueId = uid.slice(0, 8);
        setLoading(true);
        if(User.name !=='' && User.age !==''){
            var req = await fetch('https://my-app-db-33c96-default-rtdb.firebaseio.com/my_app.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: uniqueId, name: User.name, age: User.age, email: User.email})
            });
            if(req.ok){
                setLoading(false);
                setShowSuccessAlert(true); 
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 1000);
            }
            setUser({ name: '', age: '' });
        }
        else{
            alert('Do not leave fields empty');
            setLoading(false);
        }
        navigate('/add');
    }

    if (loading) {
        return (
            <Spinner animation="border" role="status" style={{ margin:'10rem' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    
    return (
        <div className="card" style={{ margin: '10rem auto', width: '300px', padding: '2rem' }}>
            <h2>Create User</h2><br />
            {showSuccessAlert && (
                <Alert style={{marginBottom:'1rem'}} icon={<CheckIcon fontSize="inherit" />} severity="success">
                    created successful.
                </Alert>
            )}
            <form method='post'>
                <input type="text" placeholder="name" required value={User.name} onChange={(e) => setUser({ ...User, name: e.target.value })} /><br /><br />
                <input type="text" placeholder="Age" required value={User.age} onChange={(e) => setUser({ ...User, age: e.target.value })} /><br /><br />
                <input type="text" placeholder="email" required value={User.email} onChange={(e) => setUser({ ...User, email: e.target.value })} /><br /><br />
                
                <Button onClick={(e) => handleSubmit(e)}>Submit</Button><br /><br />
                <Link to={'/'}>Back To User List...</Link>
            </form>
        </div>
    )
}

export default Create;
