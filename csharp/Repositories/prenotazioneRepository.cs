using _7_WebApi.Context;
using _7_WebApi.Models;
using MySql.Data.MySqlClient;

namespace _7_WebApi.Repositories;

public class prenotazioneRepository
{

    private AppDb appDb = new AppDb();

    public IEnumerable<Prenotazione> GetPrenotazione()
    {
        var result = new List<Prenotazione>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select * from prenotazione";
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var prenotazione = new Prenotazione()
            {
                id = reader.GetInt16("id"),
                sede_id = reader.GetInt16("sede_id"),
                somministrazione_id = reader.GetInt16("somministrazione_id"),
                data = reader.GetDateTime("data"),
                note = reader.GetString("note"),
                persona_id = reader.GetInt16("persona_id")
            };
            result.Add(prenotazione);
        }
        appDb.Connection.Close();

        return result;
    }

    public Prenotazione GetPrenotazione(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select * from prenotazione where id=@id";
        var parameter = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = id
        };
        command.Parameters.Add(parameter);
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var prenotazione = new Prenotazione()
            {
                id = reader.GetInt16("id"),
                sede_id = reader.GetInt16("sede_id"),
                somministrazione_id = reader.GetInt16("somministrazione_id"),
                data = reader.GetDateTime("data"),
                note = reader.GetString("note"),
                persona_id = reader.GetInt16("persona_id")
            };
            appDb.Connection.Close();
            return prenotazione;
        }

        appDb.Connection.Close();
        return null;
    }

    public bool Create(Prenotazione prenotazione)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "insert into prenotazione (data, sede_id, somministrazione_id, note, persona_id) values (@data, @sede_id, @somministrazione_id, @note, @persona_id)";
        var parameterdata = new MySqlParameter()
        {
            ParameterName = "data",
            DbType = System.Data.DbType.DateTime,
            Value = prenotazione.data
        };
        command.Parameters.Add(parameterdata);
        var parametersede_id = new MySqlParameter()
        {
            ParameterName = "sede_id",
            DbType = System.Data.DbType.Int16,
            Value = prenotazione.sede_id
        };
        command.Parameters.Add(parametersede_id);
        var parametersomministrazione_id = new MySqlParameter()
        {
            ParameterName = "somministrazione_id",
            DbType = System.Data.DbType.Int16,
            Value = prenotazione.somministrazione_id
        };
        command.Parameters.Add(parametersomministrazione_id);

        var parameternote = new MySqlParameter()
        {
            ParameterName = "note",
            DbType = System.Data.DbType.String,
            Value = prenotazione.note
        };
        command.Parameters.Add(parameternote);
        var parameterpersona_id = new MySqlParameter()
        {
            ParameterName = "persona_id",
            DbType = System.Data.DbType.Int16,
            Value = prenotazione.persona_id
        };
        command.Parameters.Add(parameterpersona_id);

        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Update(Prenotazione prenotazione)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "update prenotazione set data=@data, sede_id=@sede_id, somministrazione_id=@somministrazione_id, note=@note, persona_id=@persona_id where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = prenotazione.id
        };
        command.Parameters.Add(parameterId);
        var parameterdata = new MySqlParameter()
        {
            ParameterName = "data",
            DbType = System.Data.DbType.DateTime,
            Value = prenotazione.data
        };
        command.Parameters.Add(parameterdata);
        var parametersede_id = new MySqlParameter()
        {
            ParameterName = "sede_id",
            DbType = System.Data.DbType.Int16,
            Value = prenotazione.sede_id
        };
        command.Parameters.Add(parametersede_id);
        var parametersomministrazione_id = new MySqlParameter()
        {
            ParameterName = "somministrazione_id",
            DbType = System.Data.DbType.Int16,
            Value = prenotazione.somministrazione_id
        };
        command.Parameters.Add(parametersomministrazione_id);

        var parameternote = new MySqlParameter()
        {
            ParameterName = "note",
            DbType = System.Data.DbType.String,
            Value = prenotazione.note
        };
        command.Parameters.Add(parameternote);
        var parameterpersona_id = new MySqlParameter()
        {
            ParameterName = "persona_id",
            DbType = System.Data.DbType.Int16,
            Value = prenotazione.persona_id
        };
        command.Parameters.Add(parameterpersona_id);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Delete(int id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "delete from prenotazione where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = id
        };
        command.Parameters.Add(parameterId);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }
}