using _7_WebApi.Repositories;
using _7_WebApi.Models;

namespace _7_WebApi.Service;

public class sedeService{

    private sedeRepository sedeRepository = new sedeRepository();

    public IEnumerable<Sede> GetSede(){
        return sedeRepository.GetSede();
    }

    public Sede GetSede(int id){
        return sedeRepository.GetSede(id);
    }

    public bool Create(Sede sede){
        if (sedeRepository.GetSede(sede.id) == null){
            if (sede.nome.Length > 0 & sede.citta.Length > 0 & sede.indirizzo.Length > 0){
                return sedeRepository.Create(sede);
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    public bool Update(Sede sede){
        return sedeRepository.Update(sede);
    }

    public bool Delete(int id){
        return sedeRepository.Delete(id);
    }
}