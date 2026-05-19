import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/students";
const studentService = {

    getAll: async () =>{
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error en studentService.getAll", error);
            throw error;
        }
    },

    create: async (studentData) => {
        try {
            const response = await axios.post(API_URL, studentData);
            return response.data;
        } catch (error) {
            console.error("Error en studentService.create", error);
            throw error;
            
        }

    },
     update: async (id, studentData) =>{
        try {
           const response = await axios.put(`${API_URL}/${id}`, studentData); 
           return response.data;
        } catch (error) {
            console.error("Error en studentService.update", error);
            throw error;
        }
     },
     delete: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
           console.error(`Error en studentService.delete para ID ${id}`, error);
            throw error; 
        }
     }


};

export default studentService;