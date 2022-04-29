using _7_WebApi.Context;
using _7_WebApi.Models;
using MySql.Data.MySqlClient;

namespace _7_WebApi.Repositories;

public class opertoreRepository
{

    private AppDb appDb = new AppDb();

    public IEnumerable<Opertore> GetOpertore()
    {
        var result = new List<Opertore>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id, ruolo, nome, cognome, username, password, sede_id from opertore";
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var opertore = new Opertore()
            {
                id = reader.GetInt16("id"),
                ruolo = reader.GetString("ruolo"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                username = reader.GetString("username"),
                password = reader.GetString("password"),
                sede_id = reader.GetInt16("sede_id"),
            };
            result.Add(opertore);
        }
        appDb.Connection.Close();

        return result;
    }

    public Opertore GetOpertore(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id, ruolo, nome, cognome, username, password, sede_id from opertore where id=@id";
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
            var opertore = new Opertore()
            {
                id = reader.GetInt16("id"),
                ruolo = reader.GetString("ruolo"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                username = reader.GetString("username"),
                password = reader.GetString("password"),
                sede_id = reader.GetInt16("sede_id"),
            };
            appDb.Connection.Close();
            return opertore;
        }

        appDb.Connection.Close();
        return null;
    }

    public bool GetOpertoreBool(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id, ruolo, nome, cognome, username, password, sede_id from opertore where id=@id";
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
            var opertore = new Opertore()
            {
                id = reader.GetInt16("id"),
                ruolo = reader.GetString("ruolo"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                username = reader.GetString("username"),
                password = reader.GetString("password"),
                sede_id = reader.GetInt16("sede_id"),
            };
            appDb.Connection.Close();
            return true;
        }

        appDb.Connection.Close();
        return false;
    }


    public bool Create(Opertore opertore)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "insert into opertore (ruolo, nome, cognome, username, password, sede_id) values (@ruolo, @nome, @cognome, @username, @password, @sede_id)";
        var parameterruolo = new MySqlParameter()
        {
            ParameterName = "ruolo",
            DbType = System.Data.DbType.String,
            Value = opertore.ruolo
        };
        command.Parameters.Add(parameterruolo);
        var parameternome = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = opertore.nome
        };
        command.Parameters.Add(parameternome);
        var parametercognome = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = opertore.cognome
        };
        command.Parameters.Add(parametercognome);
        var parameterusername = new MySqlParameter()
        {
            ParameterName = "username",
            DbType = System.Data.DbType.String,
            Value = opertore.username
        };
        command.Parameters.Add(parameterusername);
        var parameterpassword = new MySqlParameter()
        {
            ParameterName = "password",
            DbType = System.Data.DbType.String,
            Value = opertore.password
        };
        command.Parameters.Add(parameterpassword);
        var parametersede_id = new MySqlParameter()
        {
            ParameterName = "sede_id",
            DbType = System.Data.DbType.Int16,
            Value = opertore.sede_id
        };
        command.Parameters.Add(parametersede_id);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Update(Opertore opertore)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "update opertore set ruolo=@ruolo, nome=@nome, cognome=@cognome, username=@username, password=@password, sede_id=@sede_id where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = opertore.id
        };
        command.Parameters.Add(parameterId);
        var parameterruolo = new MySqlParameter()
        {
            ParameterName = "ruolo",
            DbType = System.Data.DbType.String,
            Value = opertore.ruolo
        };
        command.Parameters.Add(parameterruolo);
        var parameternome = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = opertore.nome
        };
        command.Parameters.Add(parameternome);
        var parametercognome = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = opertore.cognome
        };
        command.Parameters.Add(parametercognome);
        var parameterusername = new MySqlParameter()
        {
            ParameterName = "username",
            DbType = System.Data.DbType.String,
            Value = opertore.username
        };
        command.Parameters.Add(parameterusername);
        var parameterpassword = new MySqlParameter()
        {
            ParameterName = "password",
            DbType = System.Data.DbType.String,
            Value = opertore.password
        };
        command.Parameters.Add(parameterpassword);
        var parametersede_id = new MySqlParameter()
        {
            ParameterName = "sede_id",
            DbType = System.Data.DbType.Int16,
            Value = opertore.sede_id
        };
        command.Parameters.Add(parametersede_id);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Delete(int id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "delete from opertore where id=@id";
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