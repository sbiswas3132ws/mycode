let notes = [];

export default function handler(req, res) {
    const { method } = req;
    const { id, text } = req.body || {};

     switch (method) {
         case 'GET':
             res.status(200).json(notes);
             break;
         case 'POST':
             const newNote = { id: notes.length + 1, text };
             notes.push(newNote);
             res.status(201).json(newNote);
             break;
         case 'PUT':
             notes = notes.map(nonte =>note.id === id ? {id, text } : note);
             res.status(200).json({id, text });
             break;
         case 'DELETE':
             notes = notes.filter(note => note.id !== id);
             res.status(200).json({message: `Note ${id} deleted` });
             break
         default:
             res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']); // Allowed methods
             res.status(405).end(`Method ${method} Not Allowed`); // Respond with 405 error
        }
}
