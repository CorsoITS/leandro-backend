using Microsoft.AspNetCore.Mvc;
using _7_WebApi.Service;
using _7_WebApi.Models;

namespace _7_WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class prenotazioneController : ControllerBase{
    private prenotazioneService prenotazioneService = new prenotazioneService();

    [HttpGet]
    public IEnumerable<Prenotazione> GetPrenotazione(){
        return prenotazioneService.GetPrenotazione();
    }

    [HttpGet("{id}")]
    public Prenotazione GetSede(int id){
        return prenotazioneService.GetPrenotazione(id);
    }

    [HttpPost]
    public IActionResult Create(Prenotazione prenotazione){
        var created = prenotazioneService.Create(prenotazione);
        if (created){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpPut]
    public IActionResult Update(Prenotazione prenotazione){
        var updated = prenotazioneService.Update(prenotazione);
        if (updated){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id){
        var deleted = prenotazioneService.Delete(id);
        if (deleted){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }
}