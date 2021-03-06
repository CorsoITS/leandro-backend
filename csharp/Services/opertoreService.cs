using _7_WebApi.Repositories;
using _7_WebApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace _7_WebApi.Service;

public class opertoreService{

    private opertoreRepository opertoreRepository = new opertoreRepository();
    private sedeRepository sedeRepository = new sedeRepository();

    public IEnumerable<Opertore> GetOpertore(){
        return opertoreRepository.GetOpertore();
    }

    public Opertore GetOpertore(int id){
        return opertoreRepository.GetOpertore(id);
    }

    public string HashPassword(string plainText)
    {
        var byteArray = ASCIIEncoding.ASCII.GetBytes(plainText);
        byte[] mySHA256 = SHA256.Create().ComputeHash(byteArray);
        return Convert.ToBase64String(mySHA256);
    }

    public bool Create(Opertore opertore){
        if (opertoreRepository.GetOpertore(opertore.id) == null){
            if (opertore.nome.Length > 0 && opertore.cognome.Length > 0 && opertore.username.Length > 0 && opertore.password.Length > 0){
                if(sedeRepository.GetSedeBool(opertore.sede_id)){
                    opertore.password = HashPassword(opertore.password);
                    return opertoreRepository.Create(opertore);
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public bool Update(Opertore opertore){
        return opertoreRepository.Update(opertore);
    }

    public bool Delete(int id){
        return opertoreRepository.Delete(id);
    }
}