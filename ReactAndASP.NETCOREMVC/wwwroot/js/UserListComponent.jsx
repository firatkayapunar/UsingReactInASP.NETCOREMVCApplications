//Eskiden JavaScript içinde doğrudan HTML yazamıyorduk.JavaScript'te HTML elemanları oluşturmak için genellikle document.createElement, document.createTextNode, ve appendChild gibi yöntemler kullanılırdı. JSX (JavaScript XML) ise React ile birlikte tanıtıldı ve JavaScript içinde HTML benzeri sözdizimi yazmayı mümkün kıldı. JSX, JavaScript'e yerleştirilen HTML yapısına benzeyen bir sentaks sunar ve bu, özellikle React bileşenlerini tanımlarken daha okunabilir ve daha kolay yönetilebilir kod yazmamıza olanak tanır.

//JSX, JavaScript motoru tarafından doğrudan işlenemez; bu yüzden Babel gibi bir dönüştürücü kullanılarak önce saf JavaScript'e dönüştürülmesi gerekir.

/* 
React Bileşeni Kimdir?
Bu açıklamada bahsedilen React bileşeni, UserList adlı bileşendir. 

Bu bileşen:
Kullanıcı listesini tutan ve görüntüleyen bir React sınıf bileşenidir.
Bir buton aracılığıyla yeni kullanıcılar eklemeye olanak tanır.
State adı verilen özel bir veri yapısını kullanarak, kullanıcıların listesini 
yönetir ve günceller.
*/

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: ['Fırat', 'Zeynep']
        };
    }

    addUser = () => {
        const newUser = prompt("Yeni kullanıcı adı:");
        if (newUser) {
            this.setState((state) => ({
                users: [...state.users, newUser]
            }));
        }
    };
    render() {
        return (
            <div>
                <h2>Kullanıcı Listesi</h2>
                <ul>
                    {this.state.users.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
                <button onClick={this.addUser}>Kullanıcı Ekle</button>
            </div>
        );
    }
}

ReactDOM.render(<UserList />, document.getElementById('user-list'));


/*

Çalışma Şekli

Sayfanın Yüklenmesi:

About.cshtml sayfası yüklendiğinde, tarayıcı önce temel HTML içeriğini render
eder.Ardından, React ve Babel kütüphaneleri yüklenir.

React Bileşeninin Render Edilmesi:

Tarayıcı, UserListComponent.jsx dosyasını Babel yardımıyla işler ve JSX kodunu
tarayıcıda çalışabilir JavaScript'e dönüştürür.
ReactDOM.render() fonksiyonu, UserList bileşenini id'si user-list olan div
içerisine render eder.

Kullanıcı Etkileşimi Adımları:

1.Kullanıcı "Kullanıcı Ekle" Butonuna Tıklar:
Sayfada bir buton bulunur: "Kullanıcı Ekle". Bu buton, React bileşeni
içinde tanımlanmış bir öğedir. Kullanıcı bu butona tıkladığında, butona
atanmış olan onClick olayı tetiklenir. Bu olay, bileşenin bir fonksiyonunu
çalıştırır.

2. Prompt Penceresi Açılır:
Butona tıklandığında, tarayıcıda bir prompt penceresi açılır. Bu pencere,
kullanıcıdan klavye aracılığıyla bir metin girmesini isteyen bir pop-up
penceresidir. Kullanıcıdan yeni bir kullanıcı adı girmesi istenir, örneğin
"Yeni kullanıcı adı:" şeklinde bir mesaj gösterilir.

3. Kullanıcı Adını Girer:
Kullanıcı, açılan prompt penceresine bir isim yazar (örneğin, "Ahmet") ve
"Tamam" düğmesine basar. Girilen isim, React bileşeninin ilgili fonksiyonu
tarafından alınır ve bir değişkene atanır.

4. Girilen Adın state'e Eklenmesi:
React bileşeninin içinde bir state (durum) bulunur. Bu state, bileşenin
mevcut durumunu saklar; örneğin, mevcut kullanıcıların listesini içerir.
state, React tarafından özel olarak tanınan ve yönetilen bir özelliktir.
React bileşenlerinde state'in ismi özeldir ve değiştirilmemelidir. Yani,
bu isim yerine başka bir isim kullanmak mümkün değildir. Eğer başka bir
isim kullanılırsa, React bu veri yapısını özel bir state olarak algılamaz ve
yönetmez.
Kullanıcının girdiği yeni isim, bu bileşenin state'ine eklenir. Bu işlem, bileşen içinde tanımlı setState fonksiyonu ile yapılır.
Bu fonksiyon, mevcut kullanıcı listesine yeni ismi ekler ve bileşenin durumunu günceller.

this.setState((state) => ({
    users: [...state.users, newUser]  // Yeni kullanıcı adı listeye eklenir
}));

5. Kullanıcı Listesinin Güncellenmesi:

state Güncellemesi: React bileşenlerinde state, bileşenin mevcut durumunu
saklayan bir veri yapısıdır. Bu state, bileşenin kullanıcı arayüzünde
nasıl görüneceğini belirler. Bir bileşenin state'i değiştiğinde, React
bu değişikliği fark eder ve otomatik olarak bileşeni yeniden render eder.

React'ın Yeniden Render Mekanizması: setState fonksiyonu çağrıldığında,
React önce bu değişikliği Virtual DOM'da uygular. Virtual DOM, bileşenin
hafif bir kopyası olarak, güncellenmiş haliyle yeni bir temsil oluşturur.
Bu yeni Virtual DOM, önceki Virtual DOM ile karşılaştırılır ve React,
"diffing" adı verilen süreçte, iki Virtual DOM arasındaki farkları bulur.
Farklar belirlendikten sonra, bu değişiklikler gerçek DOM üzerinde uygulanır.
Yani, önce Virtual DOM güncellenir, ardından gerçek DOM'a yansıtılır.

Otomatik Render: Farklar belirlendikten sonra, React otomatik olarak gerçek
DOM'u günceller ve bileşeni yeniden render eder. Bu sayede, state'te bir
değişiklik olduğunda, bileşen hiçbir ekstra işlem gerektirmeden, otomatik
olarak yeni haliyle render edilir.

Kullanıcı Arayüzünde Anında Güncelleme: Bu otomatik render süreci,
kullanıcı arayüzünde (UI) anında yansır. Kullanıcı, eklediği yeni ismin
listeye eklendiğini hemen görür. Bu işlem, sayfanın tamamını yeniden yüklemeye
veya manuel olarak güncellemeye gerek kalmadan gerçekleşir.

*/

/*

*************************************
Virtual DOM Olmadan Ne Olurdu?
*************************************

Tam Yeniden Render:
Her bir küçük değişiklik (örneğin, bir listeye yeni bir öğe eklemek)
tüm sayfanın ya da büyük bileşenlerin yeniden render edilmesini gerektirebilir. Bu, özellikle büyük yapılar için çok zaman alıcı olabilir.

Tarayıcı Baştan Aşağı İşler:
DOM'da bir değişiklik olduğunda, tarayıcı bu değişikliği uygulamak
için tüm sayfayı veya büyük bileşenleri yeniden işler.
Bu, stil kurallarının yeniden hesaplanması, yerleşim düzeninin
yeniden yapılması ve gerektiğinde tüm sayfanın yeniden çizilmesi
anlamına gelir. Bu işlemler sırasında sayfa yenilenmez,
ancak arka planda yoğun işlem gücü gerektirdiği için uygulama yavaşlayabilir
ve kullanıcı arayüzü hissedilir derecede yavaş çalışabilir.

Performans Sorunları:
Sürekli ve gereksiz DOM güncellemeleri, tarayıcıyı zorlayabilir ve
uygulamanın yavaşlamasına neden olabilir. Kullanıcı arayüzü, özellikle
düşük performanslı cihazlarda gecikmeli ve takılmalara sebep olabilir.

*************************************
Virtual DOM'un Sağladığı Avantajlar
*************************************

Daha Az İşlem:
Virtual DOM sayesinde, React her değişiklikte gerçek DOM'u doğrudan
güncellemek yerine, önce değişiklikleri hafif bir kopya üzerinde uygular.
Bu, gereksiz güncellemelerin önüne geçer.

Verimli Güncellemeler:
React, Virtual DOM ile gerçek DOM arasındaki farkları (diffing) hızlıca
bulur ve sadece gerekli olan parçaları günceller. Örneğin, bir listeye
yeni bir öğe eklendiğinde, sadece bu yeni öğe gerçek DOM'a eklenir,
tüm liste yeniden render edilmez.

Yüksek Performans:
Bu yöntem, gereksiz işlemlerden kaçınılarak tarayıcının daha verimli
çalışmasını sağlar. Sonuç olarak, sayfa daha hızlı yüklenir ve kullanıcı
etkileşimleri daha akıcı olur.

*/