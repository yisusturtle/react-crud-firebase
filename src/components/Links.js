import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { db } from '../firebase';
import { addDoc, collection, deleteDoc, onSnapshot, doc,updateDoc } from 'firebase/firestore';
import { MdClose, MdOutlineCreate } from "react-icons/md";
import { toast } from 'react-toastify';

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("")

    const addOrEdit = async (linkObject) => {
        if (currentId === "") {
            await addDoc(collection(db, "links"), linkObject);
            toast("New link added", {
                type: "success",
                autoClose: 2000
            });
        }else{
            await updateDoc(doc(db,"links",currentId),linkObject);
            toast("Updated", {
                type: "info",
                autoClose: 2000
            });
            setCurrentId("");
        }
    };

    const onDeleteLink = async (id) => {
        if (window.confirm("Are you sure?, the link will be remove")) {
            await deleteDoc(doc(db, "links", id));
            toast("Link removed", {
                type: "warning",
                autoClose: 2000
            });
        }
    };

    const getLinks = () => {
        const unsub = onSnapshot(collection(db, "links"), (doc) => {
            const valoresDocs = [];
            doc.docs.forEach((doc) => {

                valoresDocs.push({ ...doc.data(), id: doc.id });

            })
            setLinks(valoresDocs);

        });

    }
    useEffect(() => {
        getLinks();
    }, []);

    return (
        <>
            <div className="col-md-2"></div>
            <div className="col-md-8 p-2">
                <LinkForm addOrEdit={addOrEdit} currentId={currentId} links={links} />
            </div>
            <div className="col-md-2"></div>

            <div className="col-md-2"></div>
            <div className="col-md-8 p-2">
                {
                    links.map((link, index) => (
                        <div className="card mb-1" key={link.id}>
                            <div className="mx-2 text-muted">{index + 1}</div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h4 >{link.name}</h4>
                                    <div className="">
                                        <i className='text-danger m-2' onClick={() => onDeleteLink(link.id)}><MdClose /></i>
                                        <i className='text-warning m-2' onClick={() => setCurrentId(link.id)} ><MdOutlineCreate /></i>
                                    </div>


                                </div>

                                <p>{link.description}</p>
                                <a href={link.url} target="_blank">Go to Website</a>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="col-md-2"></div>
        </>

    );
};

export default Links;
