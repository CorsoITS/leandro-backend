using Microsoft.AspNetCore.Mvc;
using _7_WebApi.Service;
using _7_WebApi.Models;

namespace _7_WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class somministrazioneController : ControllerBase{
    private somministrazioneService somministrazioneService = new somministrazioneService();

    [HttpGet]
    public IEnumerable<Somministrazione> GetSomministrazione(){
        return somministrazioneService.GetSomministrazione();
    }

    [HttpGet("{id}")]
    public Somministrazione GetSomministrazione(int id){
        return somministrazioneService.GetSomministrazione(id);
    }

    [HttpGet("vaccino/{vaccino}")]
    public IEnumerable<Somministrazione> GetSomministrazione(string vaccino){
        return somministrazioneService.GetSomministrazioneByVaccino(vaccino);
    }

    [HttpGet("dose/{dose}")]
    public IEnumerable<Somministrazione> GetSomministrazioneByDose(string dose){
        return somministrazioneService.GetSomministrazioneByDose(dose);
    }

    [HttpPost]
    public IActionResult Create(Somministrazione somministrazione){
        var created = somministrazioneService.Create(somministrazione);
        if (created){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpPut]
    public IActionResult Update(Somministrazione somministrazione){
        var updated = somministrazioneService.Update(somministrazione);
        if (updated){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id){
        var deleted = somministrazioneService.Delete(id);
        if (deleted){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }
}