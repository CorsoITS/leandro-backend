using _7_WebApi.Context;
using _7_WebApi.Models;
using MySql.Data.MySqlClient;

namespace _7_WebApi.Repositories;

public class somministrazioneRepository
{

    private AppDb appDb = new AppDb();

    public IEnumerable<Somministrazione> GetSomministrazione()
    {
        var result = new List<Somministrazione>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select * from somministrazione";
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            result.Add(somministrazione);
        }
        appDb.Connection.Close();

        return result;
    }
    public IEnumerable<Somministrazione> GetSomministrazioneByVaccino(string vaccino)
    {
        var result = new List<Somministrazione>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select * from somministrazione where vaccino=@vaccino";
        var parameter = new MySqlParameter()
        {
            ParameterName = "vaccino",
            DbType = System.Data.DbType.String,
            Value = vaccino
        };
        command.Parameters.Add(parameter);
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            result.Add(somministrazione);
        }
        appDb.Connection.Close();

        return result;
    }
    public IEnumerable<Somministrazione> GetSomministrazioneByDose(string dose)
    {
        var result = new List<Somministrazione>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select * from somministrazione where dose=@dose";
        var parameter = new MySqlParameter()
        {
            ParameterName = "dose",
            DbType = System.Data.DbType.String,
            Value = dose
        };
        command.Parameters.Add(parameter);
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            result.Add(somministrazione);
        }
        appDb.Connection.Close();

        return result;
    }
    public IEnumerable<Somministrazione> GetSomministrazioneByUsername(string username)
    {
        var result = new List<Somministrazione>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select * from somministrazione where opertore_id=(select id FROM opertore where username = @username)";
        var parameter = new MySqlParameter()
        {
            ParameterName = "username",
            DbType = System.Data.DbType.String,
            Value = username
        };
        command.Parameters.Add(parameter);
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            result.Add(somministrazione);
        }
        appDb.Connection.Close();

        return result;
    }

    public Somministrazione GetSomministrazione(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select * from somministrazione where id=@id";
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
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            appDb.Connection.Close();
            return somministrazione;
        }

        appDb.Connection.Close();
        return null;
    }

    public bool Create(Somministrazione somministrazione)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "insert into somministrazione (vaccino, dose, data_somministrazione, note, opertore_id, persona_id) values (@vaccino, @dose, @data_somministrazione, @note, @opertore_id, @persona_id)";
        var parametervaccino = new MySqlParameter()
        {
            ParameterName = "vaccino",
            DbType = System.Data.DbType.String,
            Value = somministrazione.vaccino
        };
        command.Parameters.Add(parametervaccino);
        var parameterdose = new MySqlParameter()
        {
            ParameterName = "dose",
            DbType = System.Data.DbType.String,
            Value = somministrazione.dose
        };
        command.Parameters.Add(parameterdose);
        var parameterdata_somministrazione = new MySqlParameter()
        {
            ParameterName = "data_somministrazione",
            DbType = System.Data.DbType.DateTime,
            Value = somministrazione.data_somministrazione
        };
        command.Parameters.Add(parameterdata_somministrazione);
        var parameternote = new MySqlParameter()
        {
            ParameterName = "note",
            DbType = System.Data.DbType.String,
            Value = somministrazione.note
        };
        command.Parameters.Add(parameternote);
        var parameteropertore_id = new MySqlParameter()
        {
            ParameterName = "opertore_id",
            DbType = System.Data.DbType.String,
            Value = somministrazione.opertore_id
        };
        command.Parameters.Add(parameteropertore_id);
        var parameterpersona_id = new MySqlParameter()
        {
            ParameterName = "persona_id",
            DbType = System.Data.DbType.String,
            Value = somministrazione.persona_id
        };
        command.Parameters.Add(parameterpersona_id);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Update(Somministrazione somministrazione)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "update opertore set vaccino=@vaccino, dose=@dose, data_somministrazione=@data_somministrazione, note=@note, opertore_id=@opertore_id, persona_id=@persona_id where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.id
        };
        command.Parameters.Add(parameterId);
        var parametervaccino = new MySqlParameter()
        {
            ParameterName = "vaccino",
            DbType = System.Data.DbType.String,
            Value = somministrazione.vaccino
        };
        command.Parameters.Add(parametervaccino);
        var parameterdose = new MySqlParameter()
        {
            ParameterName = "dose",
            DbType = System.Data.DbType.String,
            Value = somministrazione.dose
        };
        command.Parameters.Add(parameterdose);
        var parameterdata_somministrazione = new MySqlParameter()
        {
            ParameterName = "data_somministrazione",
            DbType = System.Data.DbType.DateTime,
            Value = somministrazione.data_somministrazione
        };
        command.Parameters.Add(parameterdata_somministrazione);
        var parameternote = new MySqlParameter()
        {
            ParameterName = "note",
            DbType = System.Data.DbType.String,
            Value = somministrazione.dose
        };
        command.Parameters.Add(parameternote);
        var parameteropertore_id = new MySqlParameter()
        {
            ParameterName = "opertore_id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.opertore_id
        };
        command.Parameters.Add(parameteropertore_id);
        var parameterpersona_id = new MySqlParameter()
        {
            ParameterName = "persona_id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.persona_id
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
        command.CommandText = "delete from somministrazione where id=@id";
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