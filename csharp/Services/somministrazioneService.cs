using _7_WebApi.Repositories;
using _7_WebApi.Models;

namespace _7_WebApi.Service;

public class somministrazioneService{

    private somministrazioneRepository somministrazioneRepository = new somministrazioneRepository();

    public IEnumerable<Somministrazione> GetSomministrazione(){
        return somministrazioneRepository.GetSomministrazione();
    }

    public Somministrazione GetSomministrazione(int id){
        return somministrazioneRepository.GetSomministrazione(id);
    }

    public bool Create(Somministrazione somministrazione){
        if (somministrazioneRepository.GetSomministrazione(somministrazione.id) == null){
            if (somministrazione.vaccino.Length > 0 & somministrazione.dose.Length > 0){
                if(somministrazione.data_somministrazione <= DateTime.Now){
                    return somministrazioneRepository.Create(somministrazione);
                }else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    public bool Update(Somministrazione somministrazione){
        return somministrazioneRepository.Update(somministrazione);
    }

    public bool Delete(int id){
        return somministrazioneRepository.Delete(id);
    }
}