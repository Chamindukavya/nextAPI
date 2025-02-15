'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Note {
    title: string;
    description: string;
    user: string;
}

export default function Note() {
    const params = useParams();

    const [notes, setNotes] = useState<Note[]>([]);  // Expecting an array of notes
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/api/notes?userId=${params.id}`);

                setNotes(response.data.notes);  // Expecting notes as an array in response
            } catch (error) {
                setError("Failed to fetch notes.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Notes for User ID: {params.id}</h1>
            {notes.length > 0 ? (
                notes.map((note, index) => (
                    <div key={index}>
                        <h2>{note.title}</h2>
                        <p>{note.description}</p>
                    </div>
                ))
            ) : (
                <p>No notes found.</p>
            )}
        </div>
    );
}
