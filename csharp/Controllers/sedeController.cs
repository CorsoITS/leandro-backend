using Microsoft.AspNetCore.Mvc;
using _7_WebApi.Service;
using _7_WebApi.Models;

namespace _7_WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class sedeController : ControllerBase{
    private sedeService sedeService = new sedeService();

    [HttpGet]
    public IEnumerable<Sede> GetSede(){
        return sedeService.GetSede();
    }

    [HttpGet("{id}")]
    public Sede GetSede(int id){
        return sedeService.GetSede(id);
    }

    [HttpPost]
    public IActionResult Create(Sede sede){
        var created = sedeService.Create(sede);
        if (created){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpPut]
    public IActionResult Update(Sede sede){
        var updated = sedeService.Update(sede);
        if (updated){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id){
        var deleted = sedeService.Delete(id);
        if (deleted){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }
}