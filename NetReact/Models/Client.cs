namespace NetReact.Models
{
    public class Client
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }

        public Client(string name, string address, int age)
        {
            Name = name;
            Address = address;
            Age = age;
        }
    }
}