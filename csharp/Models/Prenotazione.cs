namespace _7_WebApi.Models;

public class Prenotazione
{
    public int? id { get; set; }
    public DateTime data { get; set; }
    public int sede_id {get; set;}

    public int? somministrazione_id { get; set; }
    public string? note { get; set; }
    public int persona_id { get; set; }

}