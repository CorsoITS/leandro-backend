using _7_WebApi.Repositories;
using _7_WebApi.Models;

namespace _7_WebApi.Service;

public class prenotazioneService{

    private prenotazioneRepository prenotazioneRepository = new prenotazioneRepository();
    private sedeRepository sedeRepository = new sedeRepository();
    private PersonRepository personRepository = new PersonRepository();

    public IEnumerable<Prenotazione> GetPrenotazione(){
        return prenotazioneRepository.GetPrenotazione();
    }

    public Prenotazione GetPrenotazione(int id){
        return prenotazioneRepository.GetPrenotazione(id);
    }

    public bool Create(Prenotazione prenotazione){
        if (prenotazioneRepository.GetPrenotazione(prenotazione.id) == null){
            if(prenotazione.data >= DateTime.Now){
                if(personRepository.GetPersonBool(prenotazione.persona_id) && sedeRepository.GetSedeBool(prenotazione.sede_id)){
                    return prenotazioneRepository.Create(prenotazione);
                }else{
                    return false;
                }
            }else{
                return false;
            }

        }
        else{
            return false;
        }
    }

    public bool Update(Prenotazione prenotazione){
        return prenotazioneRepository.Update(prenotazione);
    }

    public bool Delete(int id){
        return prenotazioneRepository.Delete(id);
    }
}