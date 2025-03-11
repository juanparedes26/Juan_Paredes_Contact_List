const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []

		},
		actions: {
			
			// Use getActions to call a function within a fuction
			/*Obtener contactos creados*/
			getContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/JuanParedes/contacts")
					if (response.status === 404) {
						console.log(" Usuario no encontrado, creando usuario...");
						await createAgenda();
						return;
					  }

					const data = await response.json()
					console.log(data.contacts)
					setStore({ contacts: data.contacts })


				} catch (error) {
					console.log(error)

				}

			},
			/* Crear usuario */
			createAgenda:async()=>{
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/JuanParedes", {
					  method: "POST",
					  headers: { "Content-Type": "application/json" },
					  body: JSON.stringify({}),
					});
			  
					if (response.ok) {
					  console.log(" Usuario creado exitosamente");
					  getContacts();
					} else {
					  console.error("Error al crear usuario");
					}
				  } catch (error) {
					console.error(" Error en la creación de usuario:", error);
				  }


			},
           /*Añadir contacto*/
			addContact:async()=>{
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/JuanParedes/contacts", {
					  method: "POST",
					  body: JSON.stringify(nuevaTarea),
					  headers: {
						"Content-Type": "application/json",
					  },
					});
			  
					if (response.ok) {
					  console.log(" Contacto agregado correctamente");
					  getContacts(); 
					  setInputValue("");
					} else {
					  console.error(" Error al agregar contacto:", response.status);
					}
				  } catch (error) {
					console.error(" Error al agregar contacto:", error);
				  }

			},
			/*Actualizar contacto */
			 updateContact:async(id)=>{
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/JuanParedes/contacts/${id}`, {
					  method: "PUT",
					});
			  
					if (response.ok) {
					  console.log(" Contacto actualizado");
					  getContacts();
					} else {
					  console.error(" Error al actualizar contacto:", response.status);
					}
				  } catch (error) {
					console.error(" Error al actualizar contacto", error);
				  }

			 },

			 	/*Borrar contacto */

				deleteContact: async (id) => {
					try {
					  const response = await fetch(`https://playground.4geeks.com/contact/agendas/JuanParedes/contacts/${id}`, {
						method: "DELETE",
					  });
				
					  if (response.ok) {
						console.log(" Contacto eliminado");
						getContacts();
					  } else {
						console.error(" Error al eliminar contacto:", response.status);
					  }
					} catch (error) {
					  console.error(" Error al eliminar contacto:", error);
					}
				  }


		},

	}
};


export default getState;
