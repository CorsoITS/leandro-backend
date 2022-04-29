using _7_WebApi.Context;
using _7_WebApi.Models;
using MySql.Data.MySqlClient;

namespace _7_WebApi.Repositories;

public class PersonRepository
{

    private AppDb appDb = new AppDb();

    public IEnumerable<Person> GetPeople()
    {
        var result = new List<Person>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id, nome, cognome, codice_fiscale from persona";
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var persona = new Person()
            {
                id = reader.GetInt16("id"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                codice_fiscale = reader.GetString("codice_fiscale"),
            };
            result.Add(persona);
        }
        appDb.Connection.Close();

        return result;
    }

    public Person GetPerson(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id, nome, cognome, codice_fiscale from persona where id=@id";
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
            var persona = new Person()
            {
                id = reader.GetInt16("id"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                codice_fiscale = reader.GetString("codice_fiscale"),
            };
            appDb.Connection.Close();
            return persona;
        }

        appDb.Connection.Close();
        return null;
    }

    public bool Create(Person persona)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "insert into persona (nome, cognome, codice_fiscale) values (@nome, @cognome, @codice_fiscale)";
        var parameterName = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = persona.nome
        };
        command.Parameters.Add(parameterName);
        var parameterCognome = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = persona.nome
        };
        command.Parameters.Add(parameterCognome);
        var parametercodice_fiscale = new MySqlParameter()
        {
            ParameterName = "codice_fiscale",
            DbType = System.Data.DbType.String,
            Value = persona.nome
        };
        command.Parameters.Add(parametercodice_fiscale);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Update(Person persona)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "update persona set nome=@nome, cognome=@cognome, codice_fiscale=@codice_fiscale where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = persona.id
        };
        command.Parameters.Add(parameterId);
        var parameterName = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = persona.nome
        };
                var parameterCognome = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = persona.nome
        };
        command.Parameters.Add(parameterCognome);
        var parametercodice_fiscale = new MySqlParameter()
        {
            ParameterName = "codice_fiscale",
            DbType = System.Data.DbType.String,
            Value = persona.nome
        };
        command.Parameters.Add(parametercodice_fiscale);
        command.Parameters.Add(parameterName);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Delete(int id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "delete from persona where id=@id";
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