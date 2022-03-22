import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Auth/providers/AuthProvider";
import Header from "../../components/Header";
import { CasesService } from "../../services/cases.service";
import { ConditionsService } from "../../services/conditions.service";

const casesService = new CasesService();
const conditionsService = new ConditionsService();

const EvaluationPage = () => {
  const { getUser } = useContext(AuthContext);
  const [user] = useState<any | null>(getUser());
  const [conditions, setConditions] = useState<any>([]);
  const [currentCase, setCurrentCase] = useState<any>(null);
  const [selectedCondition, setSelectedCondition] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  const loadConditions = async () => {
    try {
      const response = await conditionsService.getConditions();
      const conditions = response?.data || null;
      setConditions(conditions);
    } catch (error) {
      toast.error("error");
    }
  };

  const loadNextCase = async () => {
    try {
      setLoading(true);
      const response = await casesService.getNext();
      const currentCase = response?.data || null;
      setCurrentCase(currentCase);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("error");
    }
  };

  const evaluateCase = async (caseId: string, condition: string) => {
    const data = {
      code: condition,
      evaluatedBy: user?.id,
    };

    try {
      const response = await casesService.evaluate(caseId, data);
      const evaluation = response?.data || null;
      if (evaluation) {
        toast.success("case-successfully-evaluated");
        loadNextCase();
        setSelectedCondition(null);
      }
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    // let value = Array.from(e.target.selectedOptions, (option) => option.value);
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCondition(value[0]);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    evaluateCase(currentCase.id, selectedCondition);
  };

  useEffect(() => {
    loadNextCase();
    loadConditions();
  }, []);

  return (
    <>
      <Header />
      {currentCase && !loading && (
        <div className="container">
          <div className="row">
            <div className="six columns">
              <h5>Please Review This Case:</h5>
            </div>
            <div className="six columns">
              <h5>Select Condition</h5>
            </div>
          </div>
          <div className="row">
            <div className="six columns content">
              <div className="frame">{currentCase?.description}</div>
            </div>
            <div className="six columns">
              <div className="flexer">
                <select
                  name="conditions"
                  id="conditions"
                  size={3}
                  onChange={handleChange}
                >
                  {conditions?.length > 0
                    ? conditions.map(
                        (condition: { code: string; name: string }) => (
                          <option key={condition.code} value={condition.code}>
                            {condition.name} ({condition.code})
                          </option>
                        )
                      )
                    : ""}
                </select>
              </div>
              <button
                disabled={!selectedCondition}
                onClick={handleSubmit}
                className="button-primary"
              >
                Next Case
              </button>
            </div>
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
      )}
      {!currentCase && !loading && (
        <div className="container">
          <h5>You are Done</h5>
        </div>
      )}
    </>
  );
};

export default EvaluationPage;
