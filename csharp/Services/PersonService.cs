using _7_WebApi.Repositories;
using _7_WebApi.Models;

namespace _7_WebApi.Service;

public class PersonService{

    private PersonRepository personRepository = new PersonRepository();

    public IEnumerable<Person> GetPeople(){
        return personRepository.GetPeople();
    }

    public Person GetPerson(int id){
        return personRepository.GetPerson(id);
    }

    public bool Create(Person persona){
        if (personRepository.GetPerson(persona.id) == null){
            if (persona.nome.Length > 0 && persona.cognome.Length > 0 && persona.codice_fiscale.Length == 16){
                return personRepository.Create(persona);
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    public bool Update(Person persona){
        return personRepository.Update(persona);
    }

    public bool Delete(int id){
        return personRepository.Delete(id);
    }
}