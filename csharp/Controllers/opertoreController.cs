using Microsoft.AspNetCore.Mvc;
using _7_WebApi.Service;
using _7_WebApi.Models;

namespace _7_WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class opertoreController : ControllerBase{

    private opertoreService opertoreService = new opertoreService();

    [HttpGet]
    public IEnumerable<Opertore> GetOpertore(){
        return opertoreService.GetOpertore();
    }

    [HttpGet("{id}")]
    public Opertore GetOpertore(int id){
        return opertoreService.GetOpertore(id);
    }

    [HttpPost]
    public IActionResult Create(Opertore opertore){
        var created = opertoreService.Create(opertore);
        if (created){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpPut]
    public IActionResult Update(Opertore opertore){
        var updated = opertoreService.Update(opertore);
        if (updated){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id){
        var deleted = opertoreService.Delete(id);
        if (deleted){
            return Ok();
        }
        else{
            return BadRequest();
        }
    }
}