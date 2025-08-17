import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AgenteMelania() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ tipo: "", presupuesto: "", ubicacion: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const avanzar = () => setStep(step + 1);

  const enviarYRedirigir = () => {
    const mensaje = `Hola MELANO INC, estoy interesado en ${data.tipo} una propiedad de lujo. Mi presupuesto es ${data.presupuesto} y busco en ${data.ubicacion}.`;
    const url = `https://wa.me/5492235506585?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div className="max-w-md mx-auto p-4">
      <Card className="rounded-2xl shadow-xl">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-bold">💎 Soy MELANIA, tu acceso directo al Real Estate Premium</h1>

          {step === 0 && (
            <div className="space-y-2">
              <p>📍 ¿Buscás comprar, vender o invertir en propiedades de lujo?</p>
              <Input name="tipo" placeholder="Ej: Comprar" onChange={handleChange} />
              <Button onClick={avanzar}>Siguiente</Button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-2">
              <p>💰 ¿Cuál es tu rango de inversión o precio objetivo?</p>
              <Input name="presupuesto" placeholder="Ej: USD 500,000" onChange={handleChange} />
              <Button onClick={avanzar}>Siguiente</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <p>🌍 ¿En qué zona o ciudad estás interesado?</p>
              <Input name="ubicacion" placeholder="Ej: Punta del Este" onChange={handleChange} />
              <Button onClick={() => { avanzar(); }}>Ver Propuesta</Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <p>🚀 Basado en tus respuestas:</p>
              <ul className="list-disc list-inside">
                <li><strong>Tipo:</strong> {data.tipo}</li>
                <li><strong>Presupuesto:</strong> {data.presupuesto}</li>
                <li><strong>Ubicación:</strong> {data.ubicacion}</li>
              </ul>
              <p>Estoy analizando opciones exclusivas... ¿Querés que te contacte un asesor o preferís explorar en línea?</p>
              <div className="flex gap-2">
                <Button onClick={enviarYRedirigir}>Explorar Ahora</Button>
                <Button variant="outline" onClick={enviarYRedirigir}>Agendar Asesor</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
