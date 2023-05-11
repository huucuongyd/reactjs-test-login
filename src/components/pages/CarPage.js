import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import view from '../../assets/image icon/view.png'
import fix from '../../assets/image icon/repair.png'
import del from '../../assets/image icon/trash.png'


export default function CarPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/car',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {setData(data.data)
            });
    }, []);

    function removeAccessToken(){
        localStorage.removeItem('token')
    }


    var viewbutton = {
        backgroundColor:'white',
        backgroundImage: 'url(' + view + ')',
        height: '16px',
        width: '16px'

    }

    var fixbutton = {
        backgroundColor:'white',
        backgroundImage: 'url('+ fix +')',
        height: '16px',
        width: '16px'
    }
    var delbutton = {
        backgroundColor:'white',
        backgroundImage: 'url('+ del +')',
        height: '16px',
        width: '16px'
    }

    function Click(id){
        console.log(id)
    }

    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">chose your car</h1>
            <button onClick={Click(123)}>Click Here</button>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Version</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.version}</td>
                            <td>
                                <button className='button-option' style={viewbutton}></button>
                                <button className='button-option' style={fixbutton}></button>
                                <button className='button-option' style={delbutton}></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Link to="/">
                <button className="primary-button" onClick={removeAccessToken}>Log out</button>
            </Link>
        </div>
    )
}

